[OWL-ViT](https://huggingface.co/docs/transformers/en/model_doc/owlvit)

To use OWL-ViT in your code, you can follow these steps:

1. Install the Hugging Face Transformers library:
    ```shell
    pip install transformers
    ```

2. Import the necessary modules:
    ```python
    from transformers import OwlViTProcessor, OwlViTForObjectDetection
    ```

3. Load the OWL-ViT model and tokenizer:
    ```python
    model = OwlViTForObjectDetection.from_pretrained("MODEL_NAME")
    processor = OwlViTProcessor.from_pretrained("MODEL_NAME")
    ```
    **we have used "MODEL_NAME" = "google/owlvit-base-patch32"** 
4. Preprocess your input image:

    Input Image

    ```python
    image = Image.open(i).convert('RGB')
    target_sizes = torch.Tensor([Image.open(i).convert('RGB').size[::-1]])
    ```
    Query Images

    ```python
    for i in query_image:
        query_img = Image.open(i).convert('RGB')
        image_list.append(query_img)
    ```

    ```python
    inputs = processor(images=image, query_images=img, return_tensors="pt")
    ```

5. Pass the preprocessed inputs through the OWL-ViT model:
    ```python
    output = model.image_guided_detection(**inputs)
    ```

6. Access the model's predictions or other outputs:
    ```python
    logits = outputs.logits
    target_pred_boxes = outputs.target_pred_boxes
    ```

Remember to replace "MODEL_NAME" with the actual name of the OWL-ViT model you want to use. Available models and their names can be found in the Hugging Face model documentation.
