type User = {
  username: string;
  email: string;
  avatar?: string;
  weight: string;
  age: string;
  height: string;
  gender: string;
  bmi: string;
  createdAt: string;
};

type ErrResponse = {
  response: {
    data: {
      message: string;
    };
  };
};

export { User, ErrResponse };
