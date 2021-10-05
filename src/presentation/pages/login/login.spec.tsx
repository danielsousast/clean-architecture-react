import React from "react";
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import faker from "faker";
import Login from "./login";
import { ValidationSpy } from "@/presentation/test";
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  validationSpy.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  );

  return { sut, validationSpy, authenticationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should show email error if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const emailInput = sut.getByTestId("email") as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.textContent).toBe(validationError);
  });

  test("Should show password error if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe(validationError);
  });

  test("Should show email stat if validation succeeds", () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.textContent).toBe("");
  });

  test("Should show password stat if validation succeeds", () => {
    const { sut } = makeSut();
    const passwordInput = sut.getByTestId("password") as HTMLInputElement;

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("");
  });

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading on submit", () => {
    const { sut } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });

    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    const loading = sut.getByTestId("loading");

    expect(loading).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;
    fireEvent.input(emailInput, {
      target: { value: email },
    });

    const passwordInput = sut.getByTestId("password") as HTMLInputElement;
    fireEvent.input(passwordInput, {
      target: { value: password },
    });

    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
    const loading = sut.getByTestId("loading");

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
