import "../styles/index.css";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { UserAuth } from "../contexts/AuthContext";
import { UserDB } from "../contexts/DatabaseContext";
function Login() {
  const [studentNum, setStudentNum] = useState("");
  const [password, setPassword] = useState("");
  const { session, initialized, signInUser, signInUserWithGoogle } = UserAuth();
  const { fetchMemberEmail } = UserDB();
  const Navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const emailResult = await fetchMemberEmail(studentNum);
      if (emailResult.error) {
        toast.error(
          emailResult.error?.code === "PGRST116"
            ? "Student number doesn't exist."
            : emailResult.error?.message,
        );
      } else {
        const result = await signInUser(emailResult?.data, password);

        if (result.error) {
          toast.error(
            result.error?.code === "invalid_credentials"
              ? "Invalid password."
              : result.error.message,
          );
        } else {
          toast.success("Login successful!");
          setTimeout(() => {
            Navigate("/dashboard/home");
          }, 1000);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred during login.");
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInUserWithGoogle();
    } catch (err) {
      console.error("login error", err);
    }
  };

  useEffect(() => {
    if (session) {
      setTimeout(() => {
        Navigate("/dashboard/home");
      }, 1000);
    }
  }, [session]);

  useEffect(() => {
    if (!initialized) {
      toast.loading("loading...", { toastId: "auth" });
    } else {
      toast.dismiss("auth");
    }
  }, [initialized]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="auth-card">
        <form onSubmit={handleLogin} className="auth-left">
          <img src="upacm.png" className="img-logo" alt="" />
          <h2 className="text-2xl font-semibold">Hello ACMem!</h2>

          <input
            type="text"
            placeholder="20XX-XXXXX"
            className="text-field"
            onChange={(e) => {
              toast.dismiss();
              setStudentNum(e.target.value);
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="text-field"
            onChange={(e) => {
              toast.dismiss();
              setPassword(e.target.value);
            }}
          />

          <button type="submit" className="btn-primary">
            Sign in
          </button>
           <div className="flex justify-end">
             <Link to="/signup" className="text-sm text-(--color-blue) hover:underline">
                Forgot password?
              </Link>
           </div>

         

          <div className="divider">OR</div>

          <div className="flex justify-center">
            <p className="text-sm text-gray-600">Not yet affiliated with ACM?   <Link to="/signup" className="text-(--color-blue) hover:underline">
              Signup.
            </Link></p>
          </div>
        

          {/* <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn-outline"
          >
            <div className="flex gap-2 h-8 justify-center align-middle items-center">
              <img src="google.png" className="w-5" alt="" />
              <p>Continue with Google</p>
            </div>
          </button> */}
        </form>

        <div className="auth-right">
          <img src="jammond.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
