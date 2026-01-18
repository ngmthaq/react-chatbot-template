import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import {
  TextField,
  Button,
  Typography,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CoreMessageContent } from "@/core/components";
import {
  ChatContainer,
  SidebarPaper,
  SidebarHeader,
  ConversationList,
  ConversationCard,
  MainChatArea,
  ChatHeader,
  ChatHeaderLeft,
  ToggleSidebarButton,
  MessagesContainer,
  MessageWrapper,
  MessageBubble,
  InputArea,
} from "./-styled";

export const Route = createLazyFileRoute("/_auth/chat/")({
  component: ChatPage,
});

function ChatPage() {
  const { t } = useTranslation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [conversations] = useState([
    { id: 1, title: "Project Discussion", lastMessage: "Let's discuss..." },
    { id: 2, title: "Design Review", lastMessage: "Looks good!" },
    { id: 3, title: "API Integration", lastMessage: "What about..." },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", isUser: false },
    { id: 2, text: "I need help with my project", isUser: true },
    { id: 3, text: "### Sure! Tell me more about it.", isUser: false },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(1);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: inputValue, isUser: true },
      ]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      {/* Sidebar */}
      <Collapse
        in={isSidebarOpen}
        orientation="horizontal"
        sx={{ height: "100%" }}
      >
        <SidebarPaper elevation={2}>
          <SidebarHeader>
            <Button variant="contained" fullWidth>
              {t("chat.newConversation")}
            </Button>
          </SidebarHeader>
          <Divider />
          <ConversationList>
            {conversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                isSelected={selectedConversation === conv.id}
              >
                <CardContent sx={{ pb: "16px !important" }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    {conv.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" noWrap>
                    {conv.lastMessage}
                  </Typography>
                </CardContent>
              </ConversationCard>
            ))}
          </ConversationList>
        </SidebarPaper>
      </Collapse>

      {/* Main Chat Area */}
      <MainChatArea elevation={2}>
        {/* Header */}
        <ChatHeader>
          <ChatHeaderLeft>
            <Tooltip
              title={
                isSidebarOpen ? t("chat.hideSidebar") : t("chat.showSidebar")
              }
              arrow
            >
              <ToggleSidebarButton
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </ToggleSidebarButton>
            </Tooltip>
            <Typography variant="subtitle1" fontWeight="600">
              {conversations.find((c) => c.id === selectedConversation)?.title}
            </Typography>
          </ChatHeaderLeft>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </ChatHeader>

        {/* Messages */}
        <MessagesContainer>
          {messages.map((msg) => (
            <MessageWrapper key={msg.id} isUser={msg.isUser}>
              <MessageBubble isUser={msg.isUser}>
                <CoreMessageContent text={msg.text} isUser={msg.isUser} />
              </MessageBubble>
            </MessageWrapper>
          ))}
        </MessagesContainer>

        {/* Input Area */}
        <InputArea>
          <IconButton size="small">
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder={t("chat.placeholder")}
            variant="outlined"
            size="small"
            multiline
            maxRows={6}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <SendIcon />
          </IconButton>
        </InputArea>
      </MainChatArea>
    </ChatContainer>
  );
}
