const { prisma } = require('../config/database');

const bookModel = {
  getAll: async () => {
    return await prisma.book.findMany({
      orderBy: { id: 'desc' }
    });
  },

  getById: async (id) => {
    return await prisma.book.findUnique({
      where: { id: parseInt(id) }
    });
  },

  create: async (bookData) => {
    const data = {
      title: bookData.title,
      author: bookData.author,
      description: bookData.description || null,
      dt_publication: bookData.dt_publication ? 
        new Date(bookData.dt_publication) : null
    };
    
    if (bookData.cover) {
      data.cover = Buffer.from(bookData.cover, 'base64');
    }
    
    return await prisma.book.create({ data });
  },

  update: async (id, bookData) => {
    const data = {};
    
    if (bookData.title !== undefined) data.title = bookData.title;
    if (bookData.author !== undefined) data.author = bookData.author;
    if (bookData.description !== undefined) data.description = bookData.description;
    
    if (bookData.cover !== undefined && bookData.cover !== null) {
      data.cover = Buffer.from(bookData.cover, 'base64');
    }
    
    if (bookData.dt_publication !== undefined) {
      data.dt_publication = bookData.dt_publication ? 
        new Date(bookData.dt_publication) : null;
    }
    
    return await prisma.book.update({
      where: { id: parseInt(id) },
      data
    });
  },

  delete: async (id) => {
    await prisma.book.delete({
      where: { id: parseInt(id) }
    });
    return true;
  },

  search: async (searchTerm) => {
    return await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm } },
          { author: { contains: searchTerm } },
          { description: { contains: searchTerm } }
        ]
      },
      orderBy: { id: 'desc' }
    });
  }
};

module.exports = bookModel;