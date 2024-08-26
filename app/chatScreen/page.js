'use client'
import { Box, Button, Grid, Stack, TextField, AppBar, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { PersonSearchOutlined, ForumOutlined, ChatBubbleOutlined, ChatOutlined, AccountCircleRounded } from "@mui/icons-material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
    const [messages, setMessages] = useState([
      {
        role: "assistant",
        content: "Hi, my name is Alli! I'm your own Rate My Professor support assistant. How can I help you today?"
      }
    ])

  const [message, setMessage] = useState('')
  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      {role: "user", content: message},
      {role: "assistant", content: ''}
    ])
    
    setMessage('')
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}])
    }).then(async(res) => {
      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      let result = ''
      return reader.read().then(function processText({done, value}) {
        if(done) {
          return result
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true})
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1]
          let otherMessages = messages.slice(0, messages.length - 1)
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text},
          ]
        })

        return reader.read().then(processText)
      })
    })
    
  }
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#f8edde"
    >

    <AppBar sx={{backgroundColor: "#faf2e7", boxShadow: 'none', border: '1px solid #d5bda4'}}>
        <Toolbar>
          <Typography 
            variant="h6"
            sx={{
              fontFamily: 'Courier',
              fontWeight: 600,
              color: "#4e3a28",
              flexGrow: 1,
            }}
          >
            <PersonSearchOutlined
              sx={{
                marginBottom: '-7px',
                marginRight: "5px",
                fontSize: '1.9rem',
                color: "#d5bda4",
              }}
            />
            Alli - Rate My Professor
          </Typography>

      <SignedOut>
          <Button
          variant="inherit"
              sx={{
                color: '#4e3a28',
                fontFamily: "Inter",
                borderRadius: 24,
                fontWeight: 570,
              }}
            >
              Login
            </Button>
          <Button 
          variant="outlined"
              sx={{
                color: '#4e3a28',
                boxShadow: 'none',
                backgroundColor: '#d3b18a',
                border: '1px solid #d5bda4',
                fontFamily: "Inter",
                borderRadius: 24,
                fontWeight: 570,
                marginLeft: '5px',

                '&:hover': {
                  backgroundColor: '#b8936d', 
                  border: '1px solid #f8edde', 
                },
              }}
            >
              Sign Up
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

        </Toolbar>
      </AppBar>

      <Stack 
        direction="column"
        width="1200px"
        height="700px"
        borderRadius={6}
        border='1px solid #d3b18a'
        boxShadow="0px 5px 8px rgba(0, 0, 0, 0.2)"
        backgroundColor="#E6D5BC"
        p={2} 
        spacing={3}
        marginTop={17}
      >
        <Stack 
          direction="column" 
          spacing={2}
          flexGrow={1}
          overflow='auto'
          maxHeight='100%'
        >
        {messages.map((message, index) => (
            <Box 
              key={index} 
              display="flex" 
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
                <Box bgcolor={
                  message.role === 'assistant' ? '#D4C3AA' : '#d3b18a'
                }
                color="#37281c"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField 
          label= "Ask Alli anything!" 
          fullWidth 
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          InputProps={{
            style: {
              color: '#37281c',
              backgroundColor: '#f8edde',
            }
          }}
          InputLabelProps={{
            style: {
              color: '#37281c'
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: "25px",
              '& fieldset': {
                borderColor: '#f8edde',
              },
              '&:hover fieldset': {
                borderColor: '#d3b18a',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#37281c',
              },
            },
            '& .MuiInputLabel-root': {
              color: '#37281c'
            },
          }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            sx={{
              color: '#4e3a28',
              boxShadow: 'none',
              backgroundColor: '#d3b18a',
              border: '1px solid #d5bda4',
              fontFamily: "Inter",
              borderRadius: 8,
              fontWeight: 570,

              '&:hover': {
                backgroundColor: '#b8936d', 
                border: '1px solid #E6D5BC', 
                boxShadow: 'none',
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Stack>

      <Box
            component="footer"
            sx={{
              height: '80px',
              width: '100vw',
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: '#D4C3AA'
            }}
          >
            <Typography 
              variant="body1" 
              align="center"
              sx={{
                fontFamily: 'Courier',
                fontWeight: 600,
                color: '#37281c',
              }}
            >
              © 2024 ALLI. All rights reserved.
            </Typography>
          </Box>

  </Box>
  )
}