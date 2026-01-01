import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Route = createLazyFileRoute("/_auth/chat/")({
  component: ChatPage,
});

function ChatPage() {
  const { t } = useTranslation();
  const [conversations] = useState([
    { id: 1, title: "Project Discussion", lastMessage: "Let's discuss..." },
    { id: 2, title: "Design Review", lastMessage: "Looks good!" },
    { id: 3, title: "API Integration", lastMessage: "What about..." },
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", isUser: false },
    { id: 2, text: "I need help with my project", isUser: true },
    { id: 3, text: "Sure! Tell me more about it.", isUser: false },
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

  return (
    <Box
      sx={{
        gap: 2,
        p: 2,
        display: "flex",
        height: "calc(100vh - 64px)",
      }}
    >
      {/* Sidebar */}
      <Paper
        elevation={2}
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          borderRadius: 1.5,
        }}
      >
        <Box sx={{ p: 1.5 }}>
          <Button variant="contained" fullWidth>
            {t("chat.newConversation")}
          </Button>
        </Box>
        <Divider />
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
          }}
        >
          {conversations.map((conv) => (
            <Card
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              sx={{
                mb: 0.75,
                cursor: "pointer",
                backgroundColor:
                  selectedConversation === conv.id
                    ? "action.hover"
                    : "transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <CardContent sx={{ pb: "16px !important" }}>
                <Typography variant="subtitle2" fontWeight="600">
                  {conv.title}
                </Typography>
                <Typography variant="caption" color="textSecondary" noWrap>
                  {conv.lastMessage}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>

      {/* Main Chat Area */}
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: 1.5,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="600">
              {conversations.find((c) => c.id === selectedConversation)?.title}
            </Typography>
          </Box>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: "flex",
                justifyContent: msg.isUser ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: "0.75rem 1rem",
                  maxWidth: "60%",
                  borderRadius: 1.5,
                  backgroundColor: msg.isUser ? "primary.main" : "action.hover",
                  color: msg.isUser ? "white" : "text.primary",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
            display: "flex",
            gap: 1,
            alignItems: "flex-end",
          }}
        >
          <IconButton size="small">
            <AttachFileIcon />
          </IconButton>
          <TextField
            fullWidth
            placeholder={t("chat.placeholder")}
            variant="outlined"
            size="small"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
}
