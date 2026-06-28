import { PickCreateTodo } from "@repo/types/todo.types";
import { AppContext } from "@/contex";
import { HttpResponse } from "@/http";

export async function CreateTodoValidate(c: AppContext, input: PickCreateTodo) {
  if (!input) {
    return HttpResponse(c).notFound("body Todo Send Dibutuhkan");
  }
}
