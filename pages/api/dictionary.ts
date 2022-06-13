import type { NextApiRequest, NextApiResponse } from 'next';

import dataset1 from '../../config/dataset-1.json';
import dataset2 from '../../config/dataset-2.json';
import dataset3 from '../../config/dataset-3.json';
import dataset4 from '../../config/dataset-4.json';
import dataset5 from '../../config/dataset-5.json';
import dataset6 from '../../config/dataset-6.json';
import dataset7 from '../../config/dataset-7.json';
import dataset8 from '../../config/dataset-8.json';

export default function handler(req: NextApiRequest, res: NextApiResponse<string[]>) {
  res
    .status(200)
    .json([...dataset1, ...dataset2, ...dataset3, ...dataset4, ...dataset5, ...dataset6, ...dataset7, ...dataset8]);
}
