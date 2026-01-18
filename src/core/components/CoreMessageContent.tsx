import type { FC } from "react";
import ReactMarkdown from "react-markdown";

interface CoreMessageContentProps {
  text: string;
  isUser: boolean;
}

export const CoreMessageContent: FC<CoreMessageContentProps> = ({
  text,
  isUser,
}) => {
  if (isUser) return text;

  return <ReactMarkdown>{text}</ReactMarkdown>;
};
