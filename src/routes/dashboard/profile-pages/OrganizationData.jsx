import Field from '../../../components/Field.jsx'

export default function OrganizationData({ form }){
     return (
            <div className='form'>
                <div>
                    <h1 className='font-semibold'>Organization Data</h1>
                </div>
                <section className='form-section '>
                    <Field flex='row' label="Mobile Phone:">
                        <p>{form?.phone}</p>
                    </Field>
                    <Field flex='row' label="Telephone:">
                        <p>{`${form?.telephone}`}</p>
                    </Field>
                    <Field flex='row' label="Primary Email Address:">
                        <p>{`${form?.primaryEmail}`}</p>
                    </Field>
                    <Field flex='row' label="UP Email Address:">
                        <p>{`${form?.upEmail}`}</p>
                    </Field>
                </section>
            </div>
        )
}