import {
  connectDatabase,
  insertDocument,
  getDocuments,
} from '../../../helpers/db-utils';

const handler = async (req, res) => {
  const { eventId } = req.query;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to connect to database' });
  }

  if (req.method === 'POST') {
    // add serverside validation
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      return res.status(422).json({ message: 'Invalid data' });
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    console.log(newComment);
    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment.id = result.insertedId;
      res
        .status(201)
        .json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to insert document' });
    }
  }

  if (req.method === 'GET') {
    try {
      const commentsList = await getDocuments(client, 'comments', eventId);
      console.log(commentsList);

      res.status(200).json({ comments: commentsList });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to fetch comments' });
    }
  }

  client.close();
};

export default handler;
