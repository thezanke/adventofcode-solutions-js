// generated by prepare script
const key = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: 1000,
  9: 1001,
  A: 1010,
  B: 1011,
  C: 1100,
  D: 1101,
  E: 1110,
  F: 1111,
};

export const hexToBin = (hex) => {
  let bin = "";
  for (const char of hex) {
    bin += key[char];
  }
  return bin;
};

const spliceBits = (bits, n) => {
  return bits.splice(0, n);
};

const PacketTypes = {
  Sum: 0,
  Product: 1,
  Min: 2,
  Max: 3,
  Literal: 4,
  GreaterThan: 5,
  LessThan: 6,
  EqualTo: 7,
};

class Packet {
  version = null;
  typeId = null;
  type = "UNKNOWN";

  constructor(bits) {
    this.version = parseInt(spliceBits(bits, 3).join(""), 2);
    this.typeId = parseInt(spliceBits(bits, 3).join(""), 2);

    if (this.typeId === PacketTypes.Literal) {
      this.handleLiteralConstruction(bits);
    } else {
      this.handleOperatorConstruction(bits);
    }
  }

  handleOperatorConstruction(bits) {
    this.type = "OPERATOR";
    this.lengthTypeId = parseInt(spliceBits(bits, 1), 10);
    this.subpackets = [];

    if (this.lengthTypeId) {
      const count = parseInt(spliceBits(bits, 11).join(""), 2);
      for (let i = 0; i < count; i += 1) {
        this.subpackets.push(new Packet(bits));
      }
    } else {
      const size = parseInt(spliceBits(bits, 15).join(""), 2);
      const subpacketBits = spliceBits(bits, size);
      while (subpacketBits.length) {
        // console.log(subpacketBits);
        this.subpackets.push(new Packet(subpacketBits));
      }
    }
  }

  handleLiteralConstruction(packetBits) {
    this.type = "LITERAL";

    const valueBits = [];

    while (true) {
      let [leading, ...bits] = spliceBits(packetBits, 5);
      valueBits.push(...bits);
      if (!parseInt(leading, 10)) break;
    }

    this.value = parseInt(valueBits.join(""), 2);
  }
}

const processPacket = (packet) => {
  switch (packet.typeId) {
    case PacketTypes.Literal: {
      return packet.value;
    }

    case PacketTypes.Sum: {
      return packet.subpackets.map(processPacket).reduce((t, v) => t + v, 0);
    }

    case PacketTypes.Product: {
      return packet.subpackets.map(processPacket).reduce((t, v) => t * v, 1);
    }

    case PacketTypes.Min: {
      return Math.min(...packet.subpackets.map(processPacket));
    }

    case PacketTypes.Max: {
      return Math.max(...packet.subpackets.map(processPacket));
    }

    case PacketTypes.GreaterThan: {
      let [a, b] = packet.subpackets.map(processPacket);
      return Number(a > b);
    }

    case PacketTypes.LessThan: {
      let [a, b] = packet.subpackets.map(processPacket);
      return Number(a < b);
    }

    case PacketTypes.EqualTo: {
      let [a, b] = packet.subpackets.map(processPacket);
      return Number(a === b);
    }
  }
};

export const part1 = (input) => {
  let vTotal = 0;
  let inputPacket = hexToBin(input).split("");
  let packets = [new Packet(inputPacket)];

  while (packets.length) {
    let packet = packets.pop();
    if (packet.subpackets?.length) packets.push(...packet.subpackets);
    vTotal += packet.version;
  }

  return vTotal;
};

export const part2 = (input) => {
  let inputPacket = new Packet(hexToBin(input).split(""));
  return processPacket(inputPacket);
};
