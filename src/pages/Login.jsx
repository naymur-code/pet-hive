import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { googleLogin, setUser, setLoading } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [show, SetShow] = useState(false);
  const emailRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        if (location?.state) {
          navigate(location.state);
          setLoading(false);
        } else {
          navigate("/");
          setLoading(false);
        }
        // form.reset("");
      })
      .catch((error) => setError(error.message));
  };

  const handleForgetPass = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.open("https://mail.google.com/mail/");
      })
      .catch((error) => setError(error.message));
  };

  const handleGoogleLogin = () => {
    setError("");
    googleLogin()
      .then((result) => {
        setUser(result.user);
        if (location?.state) {
          navigate(location.state);
          setLoading(false);
        } else {
          navigate("/");
        }
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-10">
        <h3 className="my-2 text-4xl font-semibold ">
          <span className="text-blue-400">Welcome </span> Back
        </h3>
        <p>Sign in to continue to WarmPaws</p>
      </div>

      <div className="flex justify-center items-center my-8">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-gray-200">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset gap-3">
                <label className="label">Email Address</label>
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  className="input"
                  placeholder="your@email.com"
                />

                <label className="label">Confirm Password</label>
                <div className="flex items-center ">
                  <input
                    name="password"
                    type={show ? "text" : "password"}
                    className="input"
                    placeholder="Enter your password"
                  />
                  {show ? (
                    <FaEyeSlash
                      className="relative -left-7 z-10 text-base"
                      onClick={() => SetShow(!show)}
                    />
                  ) : (
                    <FaEye
                      className="relative -left-7 z-10 text-base"
                      onClick={() => SetShow(!show)}
                    />
                  )}
                </div>
                <div>
                  <a className="link link-hover" onClick={handleForgetPass}>
                    Forgot password?
                  </a>
                </div>
                {error && <p className="text-red-400">{error}</p>}
                <button className="btn btn-info mt-4">Sign In</button>
              </fieldset>
            </form>
            <div className="flex gap-2">
              <hr className="text-gray-200 my-4 w-full" />
              <p className="w-full">Or continue with</p>
              <hr className="text-gray-200 my-4 w-full" />
            </div>
            <div className="w-full text-center">
              <button
                onClick={handleGoogleLogin}
                className="w-full btn bg-white text-black border-[#e5e5e5]"
              >
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p className="my-5">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue-400 border-b-1 font-semibold"
                >
                  {"  "}
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
