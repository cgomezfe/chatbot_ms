import { getConnection, sql } from "../database/connection.js";
/*
export const getChats = (req, res) => {
    res.json('mi chat')
}
*/

export const getChats = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM chatHistory");
      res.json(result.recordset);
      console.log(result)

    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };



  
  export const createNewChat = async (req, res) => {
    const { questionUser, answer } = req.body;
  
    if (!questionUser || !answer) {
      return res.status(400).json({ msg: 'Bad request, please fill the obligatory fields' });
    }
  
    try {
      const pool = await getConnection();
      const actualDate = new Date().toISOString(); // Obtener la fecha y hora actual en formato ISO
  
      await pool.request()
        .input("questionUser", sql.VarChar, questionUser)
        .input("answer", sql.VarChar, answer)
        .input("dateTime", sql.DateTime, actualDate) // Agregar el valor de dateTime a la consulta
        .query('INSERT INTO chatHistory (questionUser, answer, dateTime) VALUES (@questionUser, @answer, @dateTime)');
  
      res.json({questionUser, answer, DateTime});
    } catch (error) {
      console.error('Error al insertar el nuevo chat:', error);
      res.status(500).json({ msg: 'Error al insertar el nuevo chat', error: error.message });
    }
  };


  export const getChatById = async (req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool.request()
      .input("chatId", req.params.id)
      .query("SELECT * FROM chatHistory WHERE chatId = @chatId")

      return res.json(result.recordset[0]);

    } catch (error) {
      res.status(500);
      res.send(error.message)
    }
  }

  export const deleteChatById = async(req, res) => {
    try {
      const pool = await getConnection();

      const result = await pool.request()
      .input("chatId", req.params.id)
      .query("DELETE FROM chatHistory WHERE chatId = @chatId")


    } catch (error) {
      res.status(500)
      res.send(error.message)
    }
  }


  export const updateChatById = async (req, res) => {
    const { questionUser, answer, dateTime } = req.body;
  
    if (!questionUser || !answer || !dateTime) {
      return res.status(400).json({ msg: 'Bad request, please fill the obligatory fields' });
    }
  
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("chatId", req.params.id)
        .input("questionUser", sql.VarChar, questionUser)
        .input("answer", sql.VarChar, answer)
        .input("dateTime", sql.DateTime, dateTime)
        .query('UPDATE chatHistory SET questionUser = @questionUser, answer = @answer, dateTime = @dateTime WHERE chatId = @chatId');
  
      if (result.rowsAffected[0] === 0) return res.sendStatus(404);
  
      res.json({ questionUser, answer, dateTime, chatId: req.params.id });
    } catch (error) {
      res.status(500).json({ msg: 'Error updating the chat', error: error.message });
    }
  };
  


  
  