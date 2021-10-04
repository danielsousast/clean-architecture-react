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

  test("Should call validation with correct email", () => {
    const { sut, validationSpy } = makeSut();
    const fakeEmail = faker.internet.email();

    const emailInput = sut.getByTestId("email") as HTMLButtonElement;

    fireEvent.input(emailInput, { target: { value: fakeEmail } });
    expect(validationSpy.fieldName).toBe("email");
    expect(validationSpy.fieldValue).toBe(fakeEmail);
  });

  test("Should call validation with correct password", () => {
    const { sut, validationSpy } = makeSut();
    const fakePassword = faker.internet.password();

    const passwordInput = sut.getByTestId("password") as HTMLButtonElement;

    fireEvent.input(passwordInput, { target: { value: fakePassword } });
    expect(validationSpy.fieldName).toBe("password");
    expect(validationSpy.fieldValue).toBe(fakePassword);
  });
});
