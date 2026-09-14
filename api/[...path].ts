import { app } from '../server/app';

export const config = {
	runtime: 'nodejs20.x'
};

export default function handler(req: any, res: any) {
	return app(req, res);
}