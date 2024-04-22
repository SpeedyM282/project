import * as yup from "yup";

export interface FormData {
	proxyNumber: number;
	dateHead: string;
	dateEnd: string;
	agreementNumber: number;
	dateAgreement: string;
	myEnterpriseInn: number;
	hisEnterpriseInn: number;
	myEnterpriseName: string;
	myAccountNumber: number;
	mySWFT: number;
	myAddress: string;
	myBoss: string;
	hisEnterpriseName: string;
	hisAccountNumber: number;
	hisSWFT: number;
	hisAddress: string;
	hisBoss: string;
	ReliableJSHR: number;
	ReliableFIO: string;
	ReliablePosition: string;
	ReliablePassport: string;
	GivenByWhom: string;
	givenDate: string;
}

export const proxySchema = yup.object().shape({
	proxyNumber: yup.number().required("Ishonchnoma raqami shart"),
	dateHead: yup.string().required("Berilgan sana shart"),
	dateEnd: yup.string().required("Amal qilish sanasi shart"),
	agreementNumber: yup.number().required("Shartnoma raqami shart"),
	dateAgreement: yup.string().required("Shartnoma sanasi shart"),
	myEnterpriseInn: yup.number().required("STIR/JSHSHIR shart"),
	hisEnterpriseInn: yup.number().required("STIR/JSHSHIR shart"),
	myEnterpriseName: yup.string().required("Tashkilot nomi shart"),
	myAccountNumber: yup.number().required("Hisob raqami shart"),
	mySWFT: yup.number().required("MFO/SWIFT shart"),
	myAddress: yup.string().required("Manzil shart"),
	myBoss: yup.string().required("Direktor shart"),
	hisEnterpriseName: yup.string().required("Tashkilot nomi shart"),
	hisAccountNumber: yup.number().required("Hisob raqami shart"),
	hisSWFT: yup.number().required("MFO/SWIFT shart"),
	hisAddress: yup.string().required("Manzil shart"),
	hisBoss: yup.string().required("Direktor shart"),
	ReliableJSHR: yup.number().required("JSHSHIR shart"),
	ReliableFIO: yup.string().required("FISH shart"),
	ReliablePosition: yup.string().required("Lavozim shart"),
	ReliablePassport: yup.string().required("Pasport seriya va raqami shart"),
	GivenByWhom: yup.string().required("Kim tomonidan berilgani shart"),
	givenDate: yup.string().required("Berilgan sana shart"),
});
