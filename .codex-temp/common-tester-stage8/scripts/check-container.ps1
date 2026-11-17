$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$baseUrl = 'http://127.0.0.1:8000'

$health = Invoke-RestMethod -Uri "$baseUrl/api/health"
if ($health.status -ne 'ok' -or $health.database -ne 'connected') {
    throw 'API 또는 PostgreSQL 상태가 정상적이지 않습니다.'
}

$page = Invoke-WebRequest -Uri $baseUrl
if ($page.StatusCode -ne 200 -or $page.Content -notmatch '<div id="root"></div>') {
    throw 'React 화면을 제공하지 못했습니다.'
}
$asset = [regex]::Match($page.Content, 'src="([^"]+\.js)"')
if (-not $asset.Success) { throw '화면 JavaScript 파일을 찾지 못했습니다.' }
if ((Invoke-WebRequest -Uri "$baseUrl$($asset.Groups[1].Value)").StatusCode -ne 200) {
    throw '화면 JavaScript 파일을 제공하지 못했습니다.'
}

Invoke-RestMethod -Method Post -Uri "$baseUrl/api/demo/setup" | Out-Null
$plan = Get-Content -LiteralPath (Join-Path $root 'examples\normal-plan.json') -Raw | ConvertFrom-Json
$runBody = @{
    project_id = $plan.project_id
    route = $plan.route
    policy_version = $plan.policy_version
} | ConvertTo-Json -Compress
$run = Invoke-RestMethod -Method Post -Uri "$baseUrl/api/runs" -ContentType 'application/json' -Body $runBody
$planJson = $plan | ConvertTo-Json -Depth 20
Invoke-RestMethod -Method Put -Uri "$baseUrl/api/runs/$($run.id)/plan" `
    -ContentType 'application/json' -Body $planJson | Out-Null
$result = Invoke-RestMethod -Method Post -Uri "$baseUrl/api/runs/$($run.id)/execute"
if ($result.status -ne 'passed' -or $result.result.passed -ne 2) {
    throw "컨테이너 Playwright 검사 실패: $($result.status), $($result.result.passed)/$($result.result.total)"
}

Write-Output 'React 화면 제공: 통과'
Write-Output 'PostgreSQL 연결 및 데모 정책 등록: 통과'
Write-Output '컨테이너 Chromium Playwright 실행: 2/2 통과'
