interface Write_Message {
  [key: string]: string;
}

export const INFO_MESSAGES: Write_Message = Object.freeze({
  SUGGEST_TOPIC: 'write.topic',
  SUGGEST_SEND_PHOTO: 'write.picture',
  POSSIBLE_NUMBER: 'write.pictureInfo',
  OPTION: 'write.option',
});

export const USER_ACTIONS: Write_Message = Object.freeze({
  ADD: 'write.add',
  RESISTER_PET: 'write.register',
});
