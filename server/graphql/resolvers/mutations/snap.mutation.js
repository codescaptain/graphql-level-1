module.exports = {
  createSnap: async (parent, { data: { user_id, text } }, { Snap, pubsub }) => {
    try {
      const snap = await new Snap({
        user_id,
        text,
      }).save();

      pubsub.publish("snap added", {
        snapAdded: snap,
      });

      return snap;
    } catch (error) {
      throw new Error(error);
    }
  },
};
