import { Task } from '../models/Task';

const test = async () => {
  const tasks = await Task.findAll();
  console.log("🚀 ~ file: test.ts:5 ~ test ~ tasks:", tasks)
}
test();