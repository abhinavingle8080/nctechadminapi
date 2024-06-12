const { Notice } = require('../../models');
const constants = require('../../config/constants');
const { Op } = require("sequelize");

const getAllNotices = async (req, res) => {
    try {
        const body = req.body;
        const notices = await Notice.findAndCountAll({
            attributes: [
                "id",
                "title",
                "content",
                "posted_by",
                "date_posted",
                "expiration_date",
                "category",
                "tags",
                "visibility",
                "attachments",
                "status",
                "priority"
            ],
            offset: (parseInt(body.page) - 1) * parseInt(body.limit),
            limit: parseInt(body.limit),
            order: [['id', 'ASC']],
            where: {
                [Op.or]: [
                  {
                    title: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                  {
                    content: {
                      [Op.like]: `%${body.search}%`,
                    },
                  },
                  // Add more search conditions for other fields if needed
                ],
            },
        });
          
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Notices retrieved successfully',
            data: notices,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message,
            success: false
        });
    }
};

// const createNotice = async (req, res) => {
//     try {
//         const body = req.body;
//         const newNotice = await Notice.create({
//             title: body.title,
//             content: body.content,
//             posted_by: body.posted_by,
//             date_posted: body.date_posted,
//             expiration_date: body.expiration_date,
//             category: body.category,
//             tags: body.tags,
//             visibility: body.visibility,
//             attachments: body.attachments,
//             status: body.status,
//             priority: body.priority,
//             created_at: new Date(),
//             updated_at: new Date(),
//         });

//         res.status(constants.STATUS_CODES.SUCCESS).json({
//             statusCode: constants.STATUS_CODES.SUCCESS,
//             message: 'Notice created successfully',
//             data: newNotice,
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
//             statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
//             message: 'Internal Server Error',
//             error: error.message,
//             success: false
//         });
//     }
// };

const getNotice = async (req, res) => {
    try {
        const body = req.body;
        const notice = await Notice.findOne({
            attributes: [
                "id",
                "title",
                "content",
                "posted_by",
                "date_posted",
                "expiration_date",
                "category",
                "tags",
                "visibility",
                "attachments",
                "status",
                "priority"
            ],
            where: {
                id: body.notice_id,
            }
        });
        if (!notice) {
            return res.status(constants.STATUS_CODES.NOT_FOUND).json({
                statusCode: constants.STATUS_CODES.NOT_FOUND,
                message: 'Notice not found',
                success: false
            });
        }
        res.status(constants.STATUS_CODES.SUCCESS).json({
            statusCode: constants.STATUS_CODES.SUCCESS,
            message: 'Notice retrieved successfully',
            data: notice,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.message,
            success: false
        });
    }
};

// const updateNotice = async (req, res) => {
//     try {
//         const body = req.body;
//         const notice = await Notice.findOne({
//             where: {
//                 id: body.notice_id,  
//             }
//         });
//         if (!notice) {
//             return res.status(constants.STATUS_CODES.NOT_FOUND).json({
//                 statusCode: constants.STATUS_CODES.NOT_FOUND,
//                 message: 'Notice not found',
//                 success: false
//             });
//         }
//         await notice.update({
//             title: body.title,
//             content: body.content,
//             posted_by: body.posted_by,
//             date_posted: body.date_posted,
//             expiration_date: body.expiration_date,
//             category: body.category,
//             tags: body.tags,
//             visibility: body.visibility,
//             attachments: body.attachments,
//             status: body.status,
//             priority: body.priority,
//             updated_at: new Date(),
//         });

//         res.status(constants.STATUS_CODES.SUCCESS).json({
//             statusCode: constants.STATUS_CODES.SUCCESS,
//             message: 'Notice updated successfully',
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
//             statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
//             message: 'Internal Server Error',
//             error: error.message,
//             success: false
//         });
//     }
// };

// const deleteNotice = async (req, res) => {
//     try {
//         const body = req.body;
//         const notice = await Notice.findOne({
//             where: {
//                 id: body.notice_id,
//             },
//         });
//         if (!notice) {
//             return res.status(constants.STATUS_CODES.NOT_FOUND).json({
//                 statusCode: constants.STATUS_CODES.NOT_FOUND,
//                 message: 'Notice not found',
//                 success: false
//             });
//         }
//         await notice.destroy();

//         res.status(constants.STATUS_CODES.SUCCESS).json({
//             statusCode: constants.STATUS_CODES.SUCCESS,
//             message: 'Notice deleted successfully',
//             success: true
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(constants.STATUS_CODES.INTERNAL_SERVER_ERROR).json({
//             statusCode: constants.STATUS_CODES.INTERNAL_SERVER_ERROR,
//             message: 'Internal Server Error',
//             error: error.message,
//             success: false
//         });
//     }
// };

module.exports = {
    getAllNotices,
    // createNotice,
    getNotice,
    // updateNotice,
    // deleteNotice
};
