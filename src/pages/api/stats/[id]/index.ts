import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { statsValidationSchema } from 'validationSchema/stats';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.stats
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStatsById();
    case 'PUT':
      return updateStatsById();
    case 'DELETE':
      return deleteStatsById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStatsById() {
    const data = await prisma.stats.findFirst(convertQueryToPrismaUtil(req.query, 'stats'));
    return res.status(200).json(data);
  }

  async function updateStatsById() {
    await statsValidationSchema.validate(req.body);
    const data = await prisma.stats.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStatsById() {
    const data = await prisma.stats.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
