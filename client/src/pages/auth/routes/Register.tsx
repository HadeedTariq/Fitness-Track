import Gender from "../_components/Gender";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { RegisterValidator } from "../validators/user.validator";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    form: { register, formState, handleSubmit },
    mutations: { mutate: registerAccount, isPending },
  } = useRegisterForm();

  const createAccount = (user: RegisterValidator) => {
    console.log(user);
    user.age = user.age + " " + "years old";
    user.height = user.height + " " + "ft";
    user.weight = user.weight + " " + "kg";
    console.log(user);
    registerAccount(user);
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
                Welcome to FitQuest
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Our fitness tracking application is designed to help users
                monitor and achieve their fitness goals efficiently
              </p>

              <form
                className="mt-8 grid grid-cols-6 gap-6"
                onSubmit={handleSubmit(createAccount)}
              >
                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-sm font-medium text-gray-700">
                    Username
                  </p>

                  <input
                    type="text"
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                    {...register("username")}
                  />
                  {formState.errors.username && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.username.message}
                    </p>
                  )}
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-sm font-medium text-gray-700">
                    {" "}
                    Age
                  </p>
                  <input
                    {...register("age")}
                    type="number"
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                  />
                  {formState.errors.age && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.age.message}
                    </p>
                  )}
                </div>
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

                <div className="col-span-6 sm:col-span-3">
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

                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-sm font-medium text-gray-700">
                    Height
                  </p>

                  <input
                    type="number"
                    step={"0.01"}
                    placeholder="ft"
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                    {...register("height")}
                  />
                  {formState.errors.height && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.height.message}
                    </p>
                  )}
                </div>
                <Gender register={register} />
                <div className="col-span-6 sm:col-span-3">
                  <p className="block text-sm font-medium text-gray-700">
                    Weight
                  </p>

                  <input
                    type="number"
                    placeholder="kg"
                    {...register("weight")}
                    className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm p-2 border-2  text-gray-700 shadow-sm"
                  />
                  {formState.errors.weight && (
                    <p className="text-red-500 text-[14px]">
                      {formState.errors.weight.message}
                    </p>
                  )}
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    disabled={formState.disabled || isPending}
                    className="inline-block shrink-0 rounded-md border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-green-600  disabled:bg-green-400"
                    type="submit"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?{" "}
                    <Link
                      className="text-gray-700 underline"
                      to={"/auth/login"}
                    >
                      Log in
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

export default Register;
