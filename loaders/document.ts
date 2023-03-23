// https://github.com/CarlosZiegler/pdf-gpt3/providers/document.provider.ts
import { Document } from "langchain/document"
import {
  CSVLoader,
  CheerioWebBaseLoader,
  JSONLoader,
  PDFLoader,
  TextLoader,
} from "langchain/document_loaders"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export const createDocuments = async (fileText: string) => {
  const rawDocs = new Document({ pageContent: fileText })
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  })
  const docs = await textSplitter.splitDocuments([rawDocs])

  return docs
}

export const createDocumentsFromUrl = async (url: string) => {
  const loader = new CheerioWebBaseLoader(url)
  const docs = await loader.load()
  return docs
}

export const createDocumentsFromJsonFile = async (url: string) => {
  const loader = new JSONLoader(
    "src/document_loaders/example_data/example.json",
    "/texts"
  )
  const docs = await loader.load()
  return docs
}

export const createDocumentsFromCSVFile = async (url: string) => {
  // id,text
  //1,This is a sentence.
  //2,This is another sentence.

  const loader = new CSVLoader(
    "src/document_loaders/example_data/example.csv",
    "text"
  )
  const docs = await loader.load()
  return docs
}

export const createDocumentsFromPDFFile = async (json: any) => {
  const loader = new PDFLoader(json)
  const docs = await loader.load()
  return docs
}

export const createDocumentsFromTxtFile = async (url: string) => {
  const loader = new TextLoader("src/document_loaders/example_data/example.txt")
  const docs = await loader.load()
  return docs
}
