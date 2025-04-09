import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AiInstance } from "../../../lib/AxiosInstance";
import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  useTheme,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { closing } from "../../../Redux/Slices/ChatSlice";
import { useDispatch } from "react-redux";

// Types
interface ChatResponse {
  message: string;
}

interface ErrorResponse {
  message: string;
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const theme = useTheme();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation<
    ChatResponse,
    AxiosError<ErrorResponse>,
    string
  >({
    mutationFn: async (msg: string) => {
      const response = await AiInstance.post<ChatResponse>("/chatbot/", {
        message: msg,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { text: data.message, isBot: true, timestamp: new Date() },
      ]);
      setMessage("");
    },
    onError: (err) => {
      const errorMessage =
        err?.response?.data?.message || "Chatbot failed to respond.";
      setMessages((prev) => [
        ...prev,
        { text: errorMessage, isBot: true, timestamp: new Date() },
      ]);
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        { text: message, isBot: false, timestamp: new Date() },
      ]);
      mutate(message);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isPending) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        height: "100%", // Adjusted to fit container
        width: "100%", // Adjusted to fit container
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.100",
      }}
    >
      <CssBaseline />
      {/* Header */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Space between title and close icon
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ChatBubbleOutlineIcon />
          <Typography variant="h6" component="h1">
            Medical Assistant ChatBot
          </Typography>
        </Box>
        <IconButton
          sx={{ color: "white" }}
          aria-label="close"
          onClick={() => dispatch(closing())}
        >
          <CloseIcon />
        </IconButton>
      </Paper>

      {/* Chat Messages */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {messages.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center", mt: 4 }}
          >
            Start asking your medical questions!
          </Typography>
        ) : (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: msg.isBot ? "flex-start" : "flex-end",
                maxWidth: "70%",
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  p: 2,
                  bgcolor: msg.isBot ? "white" : "primary.light",
                  color: msg.isBot ? "text.primary" : "white",
                  borderRadius: 2,
                  borderTopLeftRadius: msg.isBot ? 0 : 8,
                  borderTopRightRadius: msg.isBot ? 8 : 0,
                  position: "relative",
                }}
              >
                <Typography variant="body1">{msg.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: "block",
                    opacity: 0.7,
                    textAlign: msg.isBot ? "left" : "right",
                  }}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
      </Box>

      {/* Input Area - Resized */}
      <Paper
        elevation={1}
        sx={{
          p: 1, // Reduced padding for compactness
          display: "flex",
          alignItems: "center",
          gap: 1, // Reduced gap
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <TextField
          multiline
          maxRows={2}
          placeholder="Ask a question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isPending}
          variant="outlined"
          fullWidth
          size="small" // Smaller input size
          sx={{ bgcolor: "white" }}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isPending || !message.trim()}
          sx={{ minWidth: "60px", p: 0.5 }} // Smaller button
        >
          {isPending ? (
            <CircularProgress size={16} color="inherit" /> // Smaller spinner
          ) : (
            <SendIcon fontSize="small" /> // Smaller icon
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default ChatBot;