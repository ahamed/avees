import type { NextApiRequest, NextApiResponse } from 'next';

import rules, { RuleSet } from '../../config/rules';

export default function handler(req: NextApiRequest, res: NextApiResponse<RuleSet>) {
  res.status(200).json(rules);
}
