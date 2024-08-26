import { AppBar, Box, Button, Grid, Stack, TextField, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import { PersonSearchOutlined, ForumOutlined, ChatBubbleOutlined, ChatOutlined, AccountCircleRounded } from "@mui/icons-material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#f8edde"
      }}
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
            href="/sign-in"
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
            href="/sign-up"
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

      <Grid container spacing={0} justifyContent="center" alignItems="center" style={{ flex: 1 }}>
          {/**HERO SECTION*/}
          <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box
              width="800px"
              height="400px"
              display="flex"
              flexDirection="column"
              alignItems="flex-end" 
              justifyContent="center" 
              paddingRight="16px"  
              marginTop={20}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "#37281c",
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  marginRight: '140px',
                }}
              >
                Find Your Perfect <br />Professor
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontFamily: 'Courier',
                  fontWeight: 200,
                  textAlign: 'left',
                  whiteSpace: 'normal',
                  maxWidth: '540px',
                  color: '#554434',
                }}
              >
                Alli is an AI-powered chat assistant that helps you discover the best professors for your needs. 
                Get personalized recommendations and insights to make informed decisions.
              </Typography>
              <Button
                variant="outlined"
                href="/chatScreen"
                sx={{
                  color: '#4e3a28',
                  boxShadow: 'none',
                  backgroundColor: '#d3b18a',
                  border: '1px solid #d5bda4',
                  fontFamily: "Courier",
                  borderRadius: 24,
                  fontWeight: 570,
                  marginRight: '354px',

                  '&:hover': {
                    backgroundColor: '#b8936d', 
                    border: '1px solid #f8edde', 
                  },
                }}
              >
                <ForumOutlined
                  sx={{
                    marginRight: 1
                  }}
                />
                Start Chatting
              </Button>
            </Box>
          </Grid>

          {/**CHAT PREVIEW SECTION*/}
          <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
            <Box
              width="800px"
              height="400px"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="550px"
                height="400px"
                backgroundColor="#E6D5BC"
                justifyContent="center"
                alignItems="center"
                border='1px solid #d3b18a'
                boxShadow="0px 5px 8px rgba(0, 0, 0, 0.2)"
                borderRadius={8}
                marginTop={10}
              >
                 <AccountCircleRounded 
                    sx={{
                      marginLeft: '20px',
                      marginBottom: '-60px',
                      fontSize: '2.9rem',
                    }}
                  />
                <Typography
                  variant="h6"
                  textAlign="left"
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    color: "#37281c",
                    marginLeft: '75px',
                    marginTop: '-10px',
                    fontSize: '1.2rem',
                  }}
                >
                 
                  Alli - Rate My Professor 
                </Typography>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: 'Courier',
                    fontWeight: 500,
                    textAlign: 'left',
                    whiteSpace: 'normal',
                    color: '#554434',
                    fontSize: '1.1rem',
                    marginLeft: '75px',
                    marginBottom: 2,
                  }}
                >
                  How can I help you find the perfect professor?
                </Typography>

                <Box
                display="flex"
                  sx={{
                    width: '450px',
                    height: '80px',
                    borderRadius: 50,
                    marginLeft: 3,
                    marginTop: -1,
                    backgroundColor: '#D4C3AA',
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                     variant="h7"
                     gutterBottom
                     maxWidth= "400px"
                     sx={{
                       fontFamily: 'Courier',
                       fontWeight: 400,
                       textAlign: 'left',
                       whiteSpace: 'normal',
                       color: '#37281c',
                       fontSize: '0.97rem',
                       marginLeft: 4,
                       marginTop: '12px',
                     }}
                  >
                    Hi there! I'm Alli, I'm here to help you find the best professors for your needs. What are you looking for?
                  </Typography>
                </Box>

                <Box
                display="flex"
                  sx={{
                    width: '450px',
                    height: '80px',
                    borderRadius: 50,
                    marginLeft: 9,
                    marginTop: 2,
                    backgroundColor: '#d3b18a',
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                      variant="h7"
                      gutterBottom
                      maxWidth= "400px"
                      sx={{
                        fontFamily: 'Courier',
                        fontWeight: 400,
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        color: '#37281c',
                        fontSize: '0.97rem',
                        marginLeft: 4,
                        marginTop: '12px',
                      }}
                  >
                    Can you find me a Calculus professor that explains topics well and gives little homework?
                  </Typography>
                </Box>

                <Box
                display="flex"
                  sx={{
                    width: '450px',
                    height: '80px',
                    borderRadius: 50,
                    marginLeft: 3,
                    marginTop: 2,
                    backgroundColor: '#D4C3AA',
                    lineHeight: 1.3,
                  }}
                >
                  <Typography
                      variant="h7"
                      gutterBottom
                      maxWidth= "400px"
                      sx={{
                        fontFamily: 'Courier',
                        fontWeight: 400,
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        color: '#37281c',
                        fontSize: '0.97rem',
                        marginLeft: 4,
                        marginTop: '11px',
                      }}
                  >
                    Sure! I'd recommend Prof. Gibson, he's known to be light on homework and give helpful lectures! Here are some details...
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

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

      </Grid>
    </Box>
  )
}
