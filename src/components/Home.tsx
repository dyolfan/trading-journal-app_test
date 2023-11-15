import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAccount } from "../features/login/account";
import { AppDispatch, StoreState } from "../features/store";
import sText from "../styles/texts.module.css";
import Button from "./common/inputs/buttons/Button";
import ButtonPanel from "./common/inputs/buttons/ButtonPanel";
import Form, { FormChildProps, FormLoader, FormPropsOnSubmit } from "./common/inputs/Form";
import Input from "./common/inputs/Input";
import TextLink from "./common/links/TextLink";
import LogoBar from "./common/LogoBar";
import s from "./Home.module.css";

function Home() {
	const dispatch = useDispatch<AppDispatch>();
	const accountState = useSelector((state: StoreState) => state.account);
	const navigate = useNavigate();
	const onSubmit: FormPropsOnSubmit<{ accountName: string }> = async (values) => {
		await dispatch(getAccount({ accountName: values.accountName })).then(() => {
			navigate("/account-start");
		});
	};

	return (
		<div>
			<LogoBar />
			<div className={s.home_container}>
				<div className={s.home_panel}>
					<Form<{ accountName: string }> onSubmit={onSubmit}>
						{({ form }: FormChildProps<{ accountName: string }>) => (
							<>
								<div className='inputs_container'>
									{accountState.loading ? (
										<FormLoader />
									) : (
										<Input label='Account name' name='accountName' />
									)}
								</div>
								<ButtonPanel>
									<Button
										type='submit'
										text='Login'
										disabled={accountState.loading}
									/>
									<Button
										type='reset'
										text='Clear'
										onClick={() => form.reset({})}
										disabled={accountState.loading}
									/>
								</ButtonPanel>
							</>
						)}
					</Form>
					<div className='flex-col mt-3.5'>
						<div className={sText.normal_text}>Dont have an account?</div>
						<TextLink
							text='Register!'
							path='/register'
							isActive={!accountState.loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
