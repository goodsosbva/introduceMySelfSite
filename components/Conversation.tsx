"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "../styles/home.module.css";

const messageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "메시지를 입력해 주세요.")
    .max(200, "메시지는 200자 이내로 입력해 주세요."),
});

type MessageFormValues = z.infer<typeof messageSchema>;

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: Message[] = [
  {
    id: "intro-question-1",
    role: "user",
    content: "어떤 개발을 해왔나요?",
  },
  {
    id: "intro-answer-1",
    role: "assistant",
    content:
      "클라우드 관리 화면과 여러 팀이 사용하는 공통 UI 개발에 참여했습니다.",
  },
  {
    id: "intro-question-2",
    role: "user",
    content: "개발할 때 중요하게 생각하는 것은?",
  },
  {
    id: "intro-answer-2",
    role: "assistant",
    content: "사용하기 쉬운 화면과 함께 개발하기 좋은 구조를 고민합니다.",
  },
  {
    id: "intro-question-3",
    role: "user",
    content: "앞으로는 어떤 개발자가 되고 싶나요?",
  },
  {
    id: "intro-answer-3",
    role: "assistant",
    content:
      "프론트엔드를 중심으로 필요한 기술을 배우고 직접 적용하며 개발의 폭을 넓혀가고 있습니다.",
  },
];

export default function Conversation() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MessageFormValues>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: MessageFormValues) {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: values.message,
    };

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: "아직 실제 답변 기능을 준비하고 있습니다.",
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
      assistantMessage,
    ]);

    reset();
  }

  return (
    <section
      id="conversation"
      className={`${styles.conversation} ${styles.wrap}`}
      aria-label="개발자 소개"
    >
      <div className={styles["chat-window"]}>
        <div className={styles["chat-header"]}>
          <span className={styles.avatar} aria-hidden="true">
            HS
          </span>

          <div>
            <strong>권현성</strong>
            <span>Frontend Developer</span>
          </div>
        </div>

        <div
          className={styles.messages}
          role="log"
          aria-label="대화 내용"
          aria-live="polite"
        >
          {messages.map((message) => (
            <p
              key={message.id}
              className={`${styles.bubble} ${
                message.role === "user" ? styles.question : styles.answer
              }`}
            >
              {message.content}
            </p>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={styles["chat-compose"]}>
            <label className={styles["sr-only"]} htmlFor="chat-input">
              대화 입력
            </label>

            <input
              id="chat-input"
              type="text"
              placeholder="메세지를 입력해 주세요"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
            />

            <button type="submit" aria-label="전송">
              ➤
            </button>
          </div>

          {errors.message && (
            <p id="message-error" className={styles["form-error"]} role="alert">
              {errors.message.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
