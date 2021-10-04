import React from "react";
import {
  cleanup,
  render,
  RenderResult,
  fireEvent,
} from "@testing-library/react";
import Login from "./login";
import { ValidationSpy } from "@/presentation/test";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationSpy} />);

  return { sut, validationSpy };
};

describe("Login Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const { sut } = makeSut();

    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });

  test("Should show email error if validation fails", () => {
    const { sut, validationSpy } = makeSut();

    const emailInput = sut.getByTestId("email") as HTMLInputElement;

    fireEvent.input(emailInput, {
      target: { value: faker.internet.email() },
    });
    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.textContent).toBe(validationSpy.errorMessage);
  });

  test("Should show  password error if validation fails", () => {
    const { sut, validationSpy } = makeSut();

    const passwordInput = sut.getByTestId("password") as HTMLInputElement;

    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe(validationSpy.errorMessage);
  });
});
