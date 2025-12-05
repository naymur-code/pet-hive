import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";

const Register = () => {
  const [error, setError] = useState("");
  const [show, SetShow] = useState(false);
  const { googleLogin, setUser, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const from = e.target;
    const name = from.name.value;
    const email = from.email.value;
    const photoUrl = from.photoUrl.value;
    const password = from.password.value;

    // Password validation:

    const uppercase = /^(?=.*[A-Z]).+$/;
    const lowerCase = /^(?=.*[a-z]).+$/;

    if (!uppercase.test(password)) {
      return setError("Must contain at least one uppercase letter!");
    } else if (!lowerCase.test(password)) {
      return setError("Must contain at least one lowercase letter!");
    } else if (password.length < 6) {
      return setError("Minimum 6 characters!");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Swal.fire({
          title: "Create New Account Success!",
          icon: "success",
          draggable: true,
        });
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            setUser(result.user);
            from.reset();
            navigate("/");
            setLoading(false);
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));
  };

  const handleGoogleLogin = () => {
    setError("");
    googleLogin()
      .then((result) => {
        Swal.fire({
          title: "Login Success!",
          icon: "success",
          draggable: true,
        });
        setUser(result.user);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  };
  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-10">
        <h3 className="my-2 text-4xl font-semibold ">
          Join <span className="text-blue-400">WinterPaws</span>
        </h3>
        <p>Create your account to keep your pets safe this winter</p>
      </div>

      <div className="flex justify-center items-center my-8">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl border border-gray-200">
          <div className="card-body">
            <form action="" onSubmit={handleSubmit}>
              <fieldset className="fieldset gap-4">
                <label className="label">Full Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Enter your full name"
                />

                <label className="label">Email Address</label>
                <input
                  name="email"
                  type="text"
                  className="input"
                  placeholder="dsf@gmail.com"
                  required
                />

                <label className="label">Profile Photo URL (Optional)</label>
                <input
                  name="photoUrl"
                  type="text"
                  className="input"
                  placeholder="https://example.com/photo.jpg"
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
                {error && <p className="text-red-400">{error}</p>}

                <button className="btn btn-info mt-4">Create Account</button>
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
                Already have an account? {"  "}
                <Link
                  to="/login"
                  className="text-blue-400 border-b-1 font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
