import { LoginValidator } from "../validators/user.validator";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const {
    form: { register, handleSubmit, formState },
    mutations: { mutate: loginUser, isPending },
  } = useLogin();
  const authAccount = (user: LoginValidator) => {
    loginUser(user);
  };
  return (
    <>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src={"/Hero.webp"}
              className="absolute inset-0 h-full w-full object-fill max-[1050px]:object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome back to FitQuest
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Our fitness tracking application is designed to help users
                monitor and achieve their fitness goals efficiently
              </p>

              <form
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={handleSubmit(authAccount)}
              >
                <div className="col-span-6">
                  <p className="block text-sm font-medium text-gray-700">
                    {" "}
                    Email{" "}
                  </p>

                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                    {...register("email")}
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="col-span-6">
                  <p className="block text-sm font-medium text-gray-700">
                    {" "}
                    Password{" "}
                  </p>

                  <input
                    type="password"
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                    {...register("password")}
                  />
                  {formState.errors.password && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    disabled={formState.disabled || isPending}
                    className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600  disabled:bg-green-400"
                    type="submit"
                  >
                    Login
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?{" "}
                    <Link
                      className="text-gray-700 underline"
                      to={"/auth/register"}
                    >
                      Register
                    </Link>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Login;
