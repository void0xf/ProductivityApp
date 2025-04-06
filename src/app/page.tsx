"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Typography, Box, Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        py: 4,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Productivity App
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Manage your tasks, track your time, and boost your productivity
      </Typography>
      <Box sx={{ "& > *": { m: 1 } }}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => router.push("/auth")}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.push("/app")}
        >
          View App
        </Button>
      </Box>
    </Container>
  );
}
