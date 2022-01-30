const db = require("./initDb");

const recreateConnection = () => {
  db.connect((err) => {
    if (err) {
      console.log("Connection with database was not established: ", err);
      setTimeout(recreateConnection, 7000);
      return;
    }
    console.log("Connection with database established");
  });

  db.on("error", (err) => {
    console.log("Database error", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      console.log("Connection with database was lost");
      recreateConnection();
    } else {
      throw err;
    }
  });
};

module.exports = { recreateConnection };
