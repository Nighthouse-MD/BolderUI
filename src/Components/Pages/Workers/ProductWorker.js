export default () => {
    self.onmessage = (message) => { /* eslint-disable-line no-restricted-globals */
        const amountOfStatRows = message.data.updatedStats.filter(ps => ps.productToTrackId === message.data.productId.toString()).length;
        postMessage(amountOfStatRows);
    };
}