import React from "react";
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import faker from "faker";
import Login from "./login";
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test";

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

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
) => {
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
};

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId("email") as HTMLInputElement;
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId("password") as HTMLInputElement;

  fireEvent.input(passwordInput, {
    target: { value: faker.internet.password() },
  });
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
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");

    expect(emailStatus.textContent).toBe(validationError);
  });

  test("Should show password error if validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordField(sut);
    const passwordStatus = sut.getByTestId("password-status");

    expect(passwordStatus.textContent).toBe(validationError);
  });

  test("Should show email stat if validation succeeds", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    const emailStatus = sut.getByTestId("email-status");

    expect(emailStatus.textContent).toBe("");
  });

  test("Should show password stat if validation succeeds", () => {
    const { sut } = makeSut();
    populatePasswordField(sut);
    const passwordStatus = sut.getByTestId("password-status");

    expect(passwordStatus.textContent).toBe("");
  });

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  test("Should show loading on submit", () => {
    const { sut } = makeSut();
    simulateValidSubmit(sut);
    const loading = sut.getByTestId("loading");

    expect(loading).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    simulateValidSubmit(sut, email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });
});
