import { fetchPets, updatePetLike } from './pet/pet-action';
import {
  fetchLetters,
  inspectReply,
  sendReply,
  editReply,
} from './admin/letters-actions';

const isFulfilledAction = (action, types) => types.includes(action.type);

async function handleEditReply(action, listenerApi) {
  const { inspection } = action.payload;
  if (inspection) {
    await listenerApi.dispatch(fetchLetters());
    return;
  }

  const { replyId } = action.meta.arg;
  await listenerApi.dispatch(inspectReply(replyId));
}

export const setupListeners = ({ startListening }) => {
  startListening({
    matcher: (action) =>
      isFulfilledAction(action, [
        inspectReply.fulfilled.type,
        sendReply.fulfilled.type,
      ]),
    effect: async (action, listenerApi) => {
      await listenerApi.dispatch(fetchLetters());
    },
  });

  startListening({
    matcher: (action) => action.type === editReply.fulfilled.type,
    effect: (action, listenerApi) => handleEditReply(action, listenerApi),
  });

  startListening({
    matcher: (action) => action.type === updatePetLike.fulfilled.type,
    effect: async (action, listenerApi) => {
      await listenerApi.dispatch(fetchPets());
    },
  });
};
