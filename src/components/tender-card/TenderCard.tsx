
type TenderCardProps = {
    tenderName: string,
    endDate: string,
    budget: number,
    resume: string,
    location: string,
    CPVCodes: string[]
}

const TenderCard = ({ tenderName, endDate, budget, resume, location, CPVCodes }: TenderCardProps) => {
    return (
        <article data-testid="tender-card" className="border rounded-4xl p-4">
            <header className="flex flex-col gap-2 pb-4">
                <h1 data-testid="tender-name" className="text-2xl">{tenderName}</h1>
                <div className="flex flex-row gap-6">
                    <p data-testid="tender-end-date">Plazo límite: {endDate}</p>
                    <p data-testid="tender-budget">Presupuesto: {budget}</p>
                    <p data-testid="tender-location">Location: {location}</p>
                </div>
            </header>
            <main className="pb-4">
                <p data-testid="tender-resume">{resume}</p>
            </main>
            <footer data-testid="tender-cpv-codes" className="">
                <div className="flex flex-row gap-2">
                    {
                        CPVCodes.map((CPVCode) => (<p>{CPVCode}</p>))
                    }
                </div>

            </footer>
        </article>
    )
}

export default TenderCard