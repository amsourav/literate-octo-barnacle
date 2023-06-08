const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  describe("When input is falsey value", () => {
    describe.each([
      {
        object: null,
        expected: "0",
      },
      {
        object: undefined,
        expected: "0",
      },
      {
        object: 0,
        expected: "0",
      },
      {
        object: false,
        expected: "0",
      },
      {
        object: "",
        expected: "0",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the literal '0'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is an object with falsey 'partitionKey' values", () => {
    describe.each([
      {
        object: {
          partitionKey: 0,
        },
        expected:
          "e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7",
      },
      {
        object: {
          partitionKey: null,
        },
        expected:
          "58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2",
      },
      {
        object: {
          partitionKey: undefined,
        },
        expected:
          "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862",
      },
      {
        object: {
          partitionKey: false,
        },
        expected:
          "51a5f43b933ce152103a4789a17f1cf958e0b5e1c793082db6a6c74dd3f04c69ad8f558e28cf7c3eac61af4e484741f095129e815c4de4fdd30e3cd6c4e3c00f",
      },
      {
        object: {
          partitionKey: "",
        },
        expected:
          "b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the hash '$expected'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is an object with a 'partitionKey' key of string type", () => {
    describe.each([
      { object: { partitionKey: "1" }, expected: "1" },
      { object: { partitionKey: "100" }, expected: "100" },
      { object: { partitionKey: "1000000" }, expected: "1000000" },
      { object: { partitionKey: "abcdefgh" }, expected: "abcdefgh" },
      {
        object: { partitionKey: "$daskdhjasdkabcdefgh" },
        expected: "$daskdhjasdkabcdefgh",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the hash '${expected}'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is an object with a 'partitionKey' key of number type", () => {
    describe.each([
      { object: { partitionKey: 1 }, expected: "1" },
      { object: { partitionKey: 100 }, expected: "100" },
      { object: { partitionKey: 1000000 }, expected: "1000000" },
      { object: { partitionKey: 100_000_000 }, expected: "100000000" },
      {
        object: { partitionKey: 9999911111000000 },
        expected: "9999911111000000",
      },
      {
        object: { partitionKey: 111111.213123123123123123 },
        expected: "111111.21312312312",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the hash '${expected}'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is an object with no 'partitionKey' key", () => {
    describe.each([
      {
        object: { notAPartitionKey: "1" },
        expected:
          "7a88aca0848ac5876075ef8b6231fe444400d4beed614cb3ab9315e56d6e9480dce7631d2cb205649056e9f6d08ca66eb00ffc0a8b878510c318cb51067a90e1",
      },
      {
        object: { notAPartitionKey: "100" },
        expected:
          "1e1fee4a70d00b0eafc632caaefdd215e79f1651aaecf62a8ca1f1ed1371aa13ee1cfba72ee461e35e507316774d4a6fd5cda77efd1f716c73c0816670d7ecd7",
      },
      {
        object: { notAPartitionKey: "1000000" },
        expected:
          "8bccb8cbb69e66df6a5925fc0410944a9649de5e001e946d509c4525580f5c086c8dd149e93ccd50f07402bcb0accee4235ca7534aa4f5f23091b8185de4740a",
      },
      {
        object: { notAPartitionKey: "abcdefgh" },
        expected:
          "d2c69269a3ea9a8df40b0e6ae29ed1c86c08c0da052cbcedd06ea7b4ed77c89c6fc7e77159b8efc7d71d27daf3b0f0ee9f1af8fefbe765bf191c182fa4bce60a",
      },
      {
        object: { notAPartitionKey: "$daskdhjasdkabcdefgh" },
        expected:
          "fcb8eb902f6fdaeaf175c1ff6aefbf76d6b2b8daaf08048134d7ac4c6b583950667d878bfda5f1be93685503514c1826ed5118d70ce39fe632b82add666655cf",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the hash '${expected}'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is an object with a 'partitionKey' key of string type with length of key more than MAX_PARTITION_KEY_LENGTH", () => {
    describe.each([
      {
        object: {
          partitionKey:
            "1589691471728924619857633851693612461869326589669516675127573146247859854674838956566814136438261143893181283616328248446859994356164737267913433472847182682335245827239656732827959463189885644671413867712493133696466864834747543725255757772547334257548575681182667984298985417456871887182584867732779",
        },
        expected:
          "f50b328a3d44780d7e5e0f8e17775a628eb4efb6298a20f3848dddc56f662d4e0cebb079f42a1e940a2b8c2467f9dc5abef67e0fcba0871114ef59acdef07223",
      },
      {
        object: {
          partitionKey:
            "992317214938861998721942968861238875338737462981134977233646143532616712122497521781419827735441644129333958865778192377423413295169923674359742324346342976532375156287673543795687816875511778664624719598945465854169939737633164688553476539283488515568832881256141318276352118795442798615668957354451",
        },
        expected:
          "201526872814b2f456afb0f8b4bc7508834780822c24ff50b86393a113097225f18df73416698b63481a5577e931e312c21fd834406109be58ec0545343fc5a9",
      },
      {
        object: {
          partitionKey:
            "551653372636777736381869177679323818484318629744226287876664585254373581114238582217211883184757558546357874585424981559317863168348278946235746389564116329688826728646848836911767339629924144969851879847871252514478851646944641568919581585546667564458144165116788262786143336923759995971688365788792",
        },
        expected:
          "2bc0abe9f08a6dc6b8c36d3ed0a0c8f1dd0f278eb46f75cea137d2cd8e68193161cc0e9dbf25c0d87eec60164c51cde510d7389fd6f2fadc25a42ae13f8e1d83",
      },
      {
        object: {
          partitionKey:
            "78915721254698911759578174719856371536336586795847176794627288319567853859134852815371332346678375596467736671993678459168881484438671248553812258725873649579244422763949281739882612652874696946172175651313392158225731211114596537714874258748199136567414138",
        },
        expected:
          "3d5877fd42db97f4da84525ede76bb3c77bff7473115c0ec1f4d27a735d58a76878bf5721a056d87bec8f4605a1c49a635c10b6957e1865e3a8840caf01504a2",
      },
      {
        object: {
          partitionKey:
            "2681299749183715532181939717416381453193911491357144772418744982377886774994982225422316455429268488456478782816851758161445713817525255541537485647636358455817473425292757792371116277873675442416736797687377726131577759452628543512143924367613492721221786274151282378154169518",
        },
        expected:
          "5987ea48b156d4f6b03fc62a4191f32a5638f87457d249557c72c37f700da01e6b158862fe07a58345dfd074f69252e02c3078898c380415c67b0443df0f5243",
      },
    ])("Calling deterministicPartitionKey($object)", ({ object, expected }) => {
      it(`Returns the hash '${expected}'`, () => {
        const generatedPartitionKey = deterministicPartitionKey(object);

        expect(generatedPartitionKey).toBe(expected);
      });
    });
  });

  describe("When input is a string", () => {
    describe.each([
      {
        object: "0",
        expected:
          "5ae8f97ede3b9ae9f4b496c125d45d34edf13ce2f9e29c1c085ae0f499820173b86d731c4ca453d2e119b4ff63d3afd3ed5fdb9753fe222ef300d4f465f522ea",
      },
      {
        object: "11",
        expected:
          "85024edfd934d85936045ac7cab448502662184ef0e083a586a52808b659185da7cf82b7e7f327710298567f2ef55ace3c0f64b5fe3363b79bb9c3127bca7fa7",
      },
      {
        object: "222",
        expected:
          "595967e9e036c6acff6ebd2c476909d2d588d5a2a6c0a0e7d3929e464c567d708b0934d3a67894649ff0f8e3f20c2e8246d4c2ceb2b9fc23053fcd328b4031c1",
      },
      {
        object: "333",
        expected:
          "a15174a3ba0f00a85b3ed9e2994eec58e4b4e2a88c81dc716bffc6838fc84bdf770af8f73c4a2088b12a296ab610e39b991cce3aa8e8f9e5ed2dfe8a0605337a",
      },
      {
        object:
          "7a88aca0848ac5876075ef8b6231fe444400d4beed614cb3ab9315e56d6e9480dce7631d2cb205649056e9f6d08ca66eb00ffc0a8b878510c318cb51067a90e17a88aca0848ac5876075ef8b6231fe444400d4beed614cb3ab9315e56d6e9480dce7631d2cb205649056e9f6d08ca66eb00ffc0a8b878510c318cb51067a90e1",
        expected:
          "b538e18368ff85cbc3a2f2db88f720e882936e2fe799a277081187e0cf778e06a8ee77fbee87cc7773d473d6763f315e8d05e3e664e4d204a9f4bed943acde07",
      },
    ])(
      "Calling deterministicPartitionKey('$object')",
      ({ object, expected }) => {
        it(`Returns the hash '${expected}'`, () => {
          const generatedPartitionKey = deterministicPartitionKey(object);

          expect(generatedPartitionKey).toBe(expected);
        });
      }
    );
  });
});
