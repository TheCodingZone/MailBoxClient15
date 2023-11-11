import { render, screen } from "@testing-library/react";
import Authentication from "./Authentication";
import userEvent from "@testing-library/user-event";

describe("Authentication part test sigup", () => {
  test("Checking the sigup", () => {
    render(<Authentication />);
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });
  test("Checking the email input", () => {
    render(<Authentication />);
    expect(
      screen.getByPlaceholderText("Enter your email", { exact: false })
    ).toBeInTheDocument();
  });
  test("Checking the Password", () => {
    render(<Authentication />);
    expect(
      screen.getByPlaceholderText("Enter your password")
    ).toBeInTheDocument();
  });
  test("Checking the confirm password", () => {
    render(<Authentication />);
    expect(
      screen.getByPlaceholderText("Confirm your password")
    ).toBeInTheDocument();
  });
  test("checking the sigup button", () => {
    render(<Authentication />);
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });
  test("Checking the login setup", () => {
    render(<Authentication />);
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });
});
