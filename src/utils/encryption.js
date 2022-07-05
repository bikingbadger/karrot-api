import bcrypt from 'bcrypt';

const hashValue = async (inputValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(inputValue, salt);
  return hashValue;
};

export { hashValue };
