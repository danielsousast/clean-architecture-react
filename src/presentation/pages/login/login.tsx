import React, { useState } from "react";
import Context from "@/presentation/contexts/form/form-context";
import FormStatus from "@/presentation/components/form-status/form-status";

interface StateProps {
  loading: boolean;
  error: string;
}

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    loading: false,
    error: "",
  });

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
      <Context.Provider value={state}>
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
            data-testid="submit"
            disabled
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
          <FormStatus />
        </form>
      </Context.Provider>
      <footer
        style={{
          backgroundColor: "#880e4f",
        }}
      />
    </div>
  );
};

export default Login;
