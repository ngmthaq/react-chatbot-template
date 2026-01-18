import { Box, Paper, Card, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ChatContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  height: "calc(100vh - 64px)",
}));

export const SidebarPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(1),
  marginRight: theme.spacing(2),
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const ConversationList = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
}));

export const ConversationCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  marginBottom: theme.spacing(0.75),
  cursor: "pointer",
  backgroundColor: isSelected ? theme.palette.action.hover : "transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MainChatArea = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRadius: theme.spacing(1),
}));

export const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const ChatHeaderLeft = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export const ToggleSidebarButton = styled(IconButton)(() => ({
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

export const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: "auto",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const MessageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ isUser }) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
}));

export const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  padding: "0.75rem 1rem",
  maxWidth: "60%",
  borderRadius: theme.spacing(1.5),
  backgroundColor: isUser
    ? theme.palette.primary.main
    : theme.palette.grey[200],
  color: isUser
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
}));

export const InputArea = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid",
  borderColor: theme.palette.divider,
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "flex-end",
}));
