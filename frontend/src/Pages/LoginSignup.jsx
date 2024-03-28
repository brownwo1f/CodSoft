import React, { useState } from "react";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const login = async () => {
    let response;
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (response = data));

    if (response.success) {
      localStorage.setItem("auth-token", response.token);
      window.location.replace("/");
    } else {
      alert(response.errors);
    }
  };

  const signup = async () => {
    let response;
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (response = data));

    if (response.success) {
      localStorage.setItem("auth-token", response.token);
      window.location.replace("/");
    } else {
      alert(response.errors);
    }
  };
  return (
    <>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-24 w-auto"
            src="src/assets/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center  text-4xl font-bold leading-9 tracking-tight text-gray-900">
            {state}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            {state == "Signup" ? (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    type="text"
                    autoComplete="given-name"
                    required
                    className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ) : null}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 px-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  state == "Login" ? login() : signup();
                }}
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
            </div>
          </div>

          {state == "Login" ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not registered yet?{" "}
              <a
                onClick={() => setState("Signup")}
                href="#"
                className="font-semibold leading-6 text-blue-500 hover:text-indigo-500"
              >
                Register
              </a>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already registered?{" "}
              <a
                onClick={() => setState("Login")}
                href="#"
                className="font-semibold leading-6 text-blue-500 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
