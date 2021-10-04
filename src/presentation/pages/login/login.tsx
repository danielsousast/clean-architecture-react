import React, { useState } from "react";
import Context from "@/presentation/contexts/form/form-context";
import FormStatus from "@/presentation/components/form-status/form-status";
import {
  Header,
  Input,
  LinkButton,
  PrimaryButton,
} from "@/presentation/components";
import { Validation } from "@/presentation/protocols/validation";

interface StateProps {
  loading: boolean;
  error: string;
  email: string;
  password: string;
}

type Props = {
  validation: Validation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState<StateProps>({
    loading: false,
    error: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    validation.validate("email", state.email);
  }, [state?.email]);

  React.useEffect(() => {
    validation.validate("password", state.password);
  }, [state?.password]);

  return (
    <div
      style={{
        width: 900,
        alignSelf: "center",
      }}
    >
      <Header />
      <Context.Provider value={{ state, setState }}>
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

          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <PrimaryButton
            type="submit"
            data-testid="submit"
            disabled
            title="Entrar"
          />

          <LinkButton title="Criar conta" />

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
