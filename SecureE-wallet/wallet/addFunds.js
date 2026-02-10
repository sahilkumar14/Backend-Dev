import fs from "fs";
import { StatusCodes } from "http-status-pro-js";
import bcrypt from "bcrypt";

function addFunds(req, res) {
  try {
    const { email, password, pin, amount } = req.body;
    const amountFunded = Number(amount);

    if (amountFunded <= 0) {
      return res.status(StatusCodes.BAD_REQUEST.code).json({
        code: StatusCodes.BAD_REQUEST.code,
        message: "Enter a valid amount",
        data: null
      });
    }

    if (!fs.existsSync("userDB.json")) {
      return res.status(StatusCodes.NOT_FOUND.code).json({
        code: StatusCodes.NOT_FOUND.code,
        message: "Database not found",
        data: null
      });
    }

    const data = JSON.parse(fs.readFileSync("userDB.json", "utf-8"));
    const user = data.find((value) => value.email === email);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND.code).json({
        code: StatusCodes.NOT_FOUND.code,
        message: "User not found",
        data: null
      });
    }

    if (
      !bcrypt.compareSync(password, user.password) ||
      !bcrypt.compareSync(pin, user.pin)
    ) {
      return res.status(StatusCodes.UNAUTHORIZED.code).json({
        code: StatusCodes.UNAUTHORIZED.code,
        message: "Invalid credentials",
        data: null
      });
    }

    // update balance
    user.balance += amountFunded;

    // ensure transaction array
    if (!Array.isArray(user.transaction)) {
      user.transaction = [];
    }

    user.transaction.push({
      transID: Date.now(),
      type: "Deposit",
      amount: amountFunded,
      timeStamp: new Date().toTimeString()
    });

    fs.writeFileSync("userDB.json", JSON.stringify(data, null, 2));

    return res.status(StatusCodes.CREATED.code).json({
      code: StatusCodes.CREATED.code,
      message: "Funds added successfully",
      data: { balance: user.balance }
    });

  } catch (err) {
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR.code,
      message: StatusCodes.INTERNAL_SERVER_ERROR.message,
      data: null
    });
  }
}

export default addFunds;
