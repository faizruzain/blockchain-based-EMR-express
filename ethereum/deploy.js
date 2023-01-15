// deployment code here
const Web3 = require("web3");
const web3 = new Web3("http://127.0.0.1:8545");

const compiled_Contract_Deployer = require("./build/ContractDeployer.json");
const compiled_Doctor_Relation = require("./build/DoctorRelation.json");
const compiled_Doctor_Verificator = require("./build/DoctorVerificator.json");
const compiled_Medical_Records = require("./build/MedicalRecords.json");

async function deploy() {
  const [admin, doctor] = await web3.eth.getAccounts();
  const CA = {};
  console.log(admin);
  console.log(doctor);

  try {
    const contractDeployer = await new web3.eth.Contract(
      compiled_Contract_Deployer.abi
    )
      .deploy({
        data: compiled_Contract_Deployer.evm.bytecode.object,
      })
      .send({
        from: admin,
        gas: "8000000",
      });

    console.log(
      `ContractDeployer Address @ ${contractDeployer.options.address}`
    );

    await contractDeployer.methods
      .getAllContractAddress("secret")
      .call({
        from: admin,
        gas: "6000000",
      })
      .then((contractAddresses) => {
        CA.MedicalRecords = contractAddresses[0]["contractAddress"];
        CA.PatientVerificator = contractAddresses[1]["contractAddress"];
        CA.DoctorVerificator = contractAddresses[2]["contractAddress"];
        CA.DoctorRelation = contractAddresses[3]["contractAddress"];
      });

    console.log(CA);

    const medicalRecords = await new web3.eth.Contract(
      compiled_Medical_Records.abi,
      CA.MedicalRecords
    );

    await medicalRecords.methods
      .setDoctorVerificatorAddress(CA.DoctorVerificator)
      .send({
        from: admin,
        gas: "6000000",
      });

    await medicalRecords.methods
      .setPatientVerificatorAddress(CA.PatientVerificator)
      .send({
        from: admin,
        gas: "6000000",
      });

    await medicalRecords.methods
      .setDoctorRelationAddress(CA.DoctorRelation)
      .send({
        from: admin,
        gas: "6000000",
      });

    const doctorRelation = await new web3.eth.Contract(
      compiled_Doctor_Relation.abi,
      CA.DoctorRelation
    );

    await doctorRelation.methods
      .setDoctorVerificatorAddress(CA.DoctorVerificator)
      .send({
        from: admin,
        gas: "6000000",
      });

    const doctorVerificator = await new web3.eth.Contract(
      compiled_Doctor_Verificator.abi,
      CA.DoctorVerificator
    );

    await doctorVerificator.methods.addDoctor(doctor).send({
      from: admin,
      gas: "6000000",
    });

    const verify = await doctorVerificator.methods.verify(doctor).call({
      from: admin,
    });

    console.log(verify);
    console.log("Setup Completed!");
  } catch (e) {
    console.log(e);
  }
}

deploy();

// ContractDeployer 0x3D79cdF5f8A570F442b11D4b938f010b8bc1A63D

// electronicMedicalRecords: '0x61DCfaba7B0867F2eaE494bE2Db62Afe53425eec',
// patientVerificator: '0x6162d5f8FDE9CCf50D944467D940E5b242cD1bCd',
// doctorVerificator: '0x0f19Efa838A00f739E50878fF616559fd4ecBbee',
// doctorRelation: '0x2165f7DDa17F5D13dd141F2448EeED221195494B'
