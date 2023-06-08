const crypto = require("crypto");

const DEFAULT_OPTIONS = {
    TRIVIAL_PARTITION_KEY: "0",
    MAX_PARTITION_KEY_LENGTH: 256,
};

function sha3_512(data) {
    return crypto.createHash("sha3-512").update(data).digest("hex");
}

exports.deterministicPartitionKey = (
    event,
    { TRIVIAL_PARTITION_KEY, MAX_PARTITION_KEY_LENGTH } = DEFAULT_OPTIONS
) => {

    let candidate;

    if (!event) {
        return TRIVIAL_PARTITION_KEY;
    }

    candidate = event.partitionKey
        ? event.partitionKey
        : sha3_512(JSON.stringify(event));

    if (typeof candidate !== "string") {
        candidate = JSON.stringify(candidate);
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        candidate = sha3_512(candidate);
    }

    return candidate;
};
