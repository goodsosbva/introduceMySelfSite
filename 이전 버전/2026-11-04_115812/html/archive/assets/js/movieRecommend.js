// 폼 제출 이벤트 리스너 등록
document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault() // 폼 제출 기본 동작 방지

    // 폼 데이터 가져오기
    var queryValue = document.getElementById('query').value

    // 파이스크립트로 값을 전달
    window.postMessage(queryValue)
})
