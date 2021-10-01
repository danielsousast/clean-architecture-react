import React from "react";

const Login: React.FC = () => {
  return (
    <div
      style={{
        width: 900,
        alignSelf: "center",
      }}
    >
      <header>
        <h1>Dev Enquetes</h1>
      </header>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          backgroundColor: "#fff",
          padding: 40,
          borderRadius: 8,
          alignSelf: "center",
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          style={{
            height: 30,
            marginBottom: 10,
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Digite sua senha"
          style={{
            height: 30,
            marginBottom: 10,
          }}
        />
        <button
          type="submit"
          style={{
            border: "none",
            height: 40,
            marginBottom: 10,
            backgroundColor: "#880e4f",
            outline: 0,
            color: "#fff",
            borderRadius: 4,
          }}
        >
          Entrar
        </button>

        <button
          type="submit"
          style={{
            border: "none",
            height: 40,
            marginBottom: 10,
            backgroundColor: "#fff",
            outline: 0,
            color: "#880e4f",
            borderRadius: 4,
          }}
        >
          Criar conta
        </button>
      </form>
      <footer
        style={{
          backgroundColor: "#880e4f",
        }}
      />
    </div>
  );
};

export default Login;
