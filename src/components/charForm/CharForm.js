import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
// import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik"
// import * as Yup from "yup"
import { NavLink } from "react-router-dom"
import useMarvelService from "../../services/MarvelService"
import ErrorMessage from "../errorMessage/ErrorMessage"

import "./charForm.scss"

const CharForm = () => {
	const [char, setChar] = useState(null)
	const [contentVisability, setContentVisability] = useState(true)
	const { process, setProcess, getCharacterByName } = useMarvelService()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		setContentVisability(true)
		if (char && char.length === 0) {
			setTimeout(() => setContentVisability(false), 3000)
		}
	}, [char])

	const onCharLoaded = (char) => {
		setChar(char)
	}

	const updateChar = (data) => {
		getCharacterByName(data.charName).then((res) => {
			onCharLoaded(res)
			setProcess("confirmed")
		})
	}

	const errorMessage =
		process === "error" ? (
			<div className='char__search-critical-error'>
				<ErrorMessage />
			</div>
		) : null
	const results = !char ? null : char.length > 0 ? (
		<div className='char__search-wrapper'>
			<div className='char__search-success'>There is! Visit {char[0].name} page?</div>
			<NavLink to={`/characters/${char[0].id}`} className='button button__secondary'>
				<div className='inner'>To page</div>
			</NavLink>
		</div>
	) : (
		<div className='char__search-error'>
			The character was not found. Check the name and try again
		</div>
	)

	return (
		<div className='char__search-form'>
			{/* <Formik
				initialValues={{
					charName: "",
				}}
				validationSchema={Yup.object({
					charName: Yup.string().required("This field is required"),
				})}
				onSubmit={(data) => {
					updateChar(data)
				}}
			>
				<Form>
					<label className='char__search-label' htmlFor='charName'>
						Or find a character by name:
					</label>
					<div className='char__search-wrapper'>
						<Field id='charName' name='charName' type='text' placeholder='Enter name' />
						<button type='submit' className='button button__main' disabled={process === "loading"}>
							<div className='inner'>{process === "loading" ? "loading..." : "find"}</div>
						</button>
					</div>
					<FormikErrorMessage component='div' className='char__search-error' name='charName' />
				</Form>
			</Formik> */}

			<form onSubmit={handleSubmit(updateChar)}>
				<label className='char__search-label' htmlFor='charName'>
					Or find a character by name:
				</label>
				<div className='char__search-wrapper'>
					<input
						{...register("charName", { required: "This field is required" })}
						placeholder='Enter name'
					/>
					<button type='submit' className='button button__main' disabled={process === "loading"}>
						<div className='inner'>{process === "loading" ? "loading..." : "find"}</div>
					</button>
				</div>
				{errors.charName && (
					<div className='char__search-error' name='charName'>
						{errors.charName.message}
					</div>
				)}
			</form>

			{contentVisability ? results : null}
			{errorMessage}
		</div>
	)
}

export default CharForm
