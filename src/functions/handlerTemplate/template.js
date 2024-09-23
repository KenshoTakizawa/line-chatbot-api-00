import 'source-map-support/register';
import { Responder } from '../lib/responder.js';
import { UserRepository } from '../../infrastructure/repository/user_repository.js';
import sequelize from "../../database.js";

const res = new Responder();

export const handler = async (event) => {
    try {
        await sequelize.authenticate();
        const userRepository = new UserRepository();

        if (!event.body) {
            return res.doNotExistBodyElement('No body provided', 400);
        }

        const lineUserId = event.pathParameters ? event.pathParameters.lineUserId : null;

        if (!lineUserId) {
            return res.doNotExistBodyElement('User ID cannot be found.', 400);
        }

        // ユーザーの存在確認（オプション）
        const user = await userRepository.getUserBylineUserId(lineUserId);
        if (!user) {
            return res.errorResponse('User not found', 404);
        }

        // ここにビジネスロジックを追加

        return res.normalResponse(
          JSON.stringify({
              message: 'Operation completed successfully',
              userId: lineUserId,
          }), 200);
    } catch (error) {
        console.error('Error in handler:', error);
        return res.errorResponse('Failed to process request', 500);
    }
};